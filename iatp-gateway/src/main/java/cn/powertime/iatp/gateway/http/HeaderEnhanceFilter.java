package cn.powertime.iatp.gateway.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;

import java.io.IOException;
import java.util.Map;

/**
 * @author ZYW
 */
public class HeaderEnhanceFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(HeaderEnhanceFilter.class);

    public static final String USER_ID_IN_HEADER = "X-AOHO-UserId";

    public static final String CLIENT_ID_IN_HEADER = "X-AOHO-ClientId";

    private static final String ANONYMOUS_USER_ID = "363319180390207488";

    public ServerHttpRequest doFilter(ServerHttpRequest request) {
        ServerHttpRequest req = request;

        String authorization = request.getHeaders().getFirst("Authorization");
        String requestURI = request.getURI().getPath();
        LOGGER.info(String.format("Enhance request URI : %s.", requestURI));

        if(StringUtils.isNotEmpty(authorization)) {
            if(isJwtBearerToken(authorization)) {
                try {
                    authorization = StringUtils.substringBetween(authorization, ".");
                    String decoded = new String(Base64.decodeBase64(authorization));
                    Map properties = new ObjectMapper().readValue(decoded, Map.class);

                    String userId = String.valueOf(properties.get(USER_ID_IN_HEADER));
                    String clientId = String.valueOf(properties.get("client_id"));

                    req = request.mutate()
                            .header(USER_ID_IN_HEADER,userId)
                            .header(CLIENT_ID_IN_HEADER,clientId)
                            .build();

                } catch (IOException e) {
                    LOGGER.error("Failed to customize header for the request, but still release it as the it would be regarded without any user details.", e);
                }
            }
        } else {
            LOGGER.info("Regard this request as anonymous request, so set anonymous user_id  in the header.");
            req = request.mutate()
                    .header(USER_ID_IN_HEADER,ANONYMOUS_USER_ID)
                    .build();
        }

        return req;
    }

    private boolean isJwtBearerToken(String token) {
        return StringUtils.countMatches(token,".") == 2 && (token.startsWith("Bearer") || token.startsWith("bearer"));
    }
}

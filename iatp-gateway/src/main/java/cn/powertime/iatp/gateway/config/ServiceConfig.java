package cn.powertime.iatp.gateway.config;

import cn.powertime.iatp.gateway.filter.AuthorizationFilter;
import cn.powertime.iatp.gateway.filter.CaptchaFilter;
import cn.powertime.iatp.gateway.http.HeaderEnhanceFilter;
import cn.powertime.iatp.gateway.properties.PermitAllUrlProperties;
import cn.powertime.iatp.gateway.properties.ResourceServerProperties;
import cn.powertime.iatp.gateway.security.CustomRemoteTokenServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableConfigurationProperties
@RibbonClient(name = "auth-server")
public class ServiceConfig {

    @Autowired
    private LoadBalancerClient loadBalancerClient;

    @Autowired
    private ResourceServerProperties resourceServerProperties;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    @Order(100)
    public CustomRemoteTokenServices customRemoteTokenServices(RestTemplate restTemplate) {
        CustomRemoteTokenServices resourceServerTokenServices = new CustomRemoteTokenServices(restTemplate);
        resourceServerTokenServices.setCheckTokenEndpointUrl(resourceServerProperties.getResource().getTokenInfoUri());
        resourceServerTokenServices.setClientId(resourceServerProperties.getClient().getClientId());
        resourceServerTokenServices.setClientSecret(resourceServerProperties.getClient().getClientSecret());
        resourceServerTokenServices.setLoadBalancerClient(loadBalancerClient);
        return resourceServerTokenServices;
    }

    @Bean
    public AuthorizationFilter authorizationFilter(CustomRemoteTokenServices customRemoteTokenServices
            , HeaderEnhanceFilter headerEnhanceFilter
            , PermitAllUrlProperties permitAllUrlProperties) {
        return new AuthorizationFilter(customRemoteTokenServices,headerEnhanceFilter,permitAllUrlProperties);
    }

    @Bean
    public CaptchaFilter captchaFilter(){
        return new CaptchaFilter();
    }


    @Bean
    public HeaderEnhanceFilter headerEnhanceFilter(){
        return new HeaderEnhanceFilter();
    }
}

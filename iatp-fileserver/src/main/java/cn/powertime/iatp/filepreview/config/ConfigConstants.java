package cn.powertime.iatp.filepreview.config;

import cn.powertime.iatp.config.FileServerConfig;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;

/**
 * @auther: chenjh
 * @time: 2019/4/10 17:22
 * @description
 */
@Component
public class ConfigConstants {

    private static FileServerConfig fileServerConfig;

    @Autowired
    public void setFileServerConfig(FileServerConfig fileServerConfig) {
        ConfigConstants.fileServerConfig = fileServerConfig;
    }

    private static String[] simText = {};
    private static String[] media = {};
    private static String convertedFileCharset;
    private static String officePreviewType;
    private static String fileDir = "";


    public static String[] getSimText() {
        return simText;
    }

    public static void setSimText(String[] simText) {
        ConfigConstants.simText = simText;
    }

    public static String[] getMedia() {
        return media;
    }

    public static void setMedia(String[] media) {
        ConfigConstants.media = media;
    }

    public static String getConvertedFileCharset() {
        return convertedFileCharset;
    }

    public static void setConvertedFileCharset(String convertedFileCharset) {
        ConfigConstants.convertedFileCharset = convertedFileCharset;
    }

    public static String getOfficePreviewType() {
        return officePreviewType;
    }

    public static void setOfficePreviewType(String officePreviewType) {
        ConfigConstants.officePreviewType = officePreviewType;
    }

    public static String getFileDir() {
        if(StringUtils.isEmpty(fileDir)) {
            fileDir = fileServerConfig.getPath() + File.separator + "file" + File.separator;
        }
        return fileDir;
    }

    @Value("${file.dir:default}")
    public void setFileDir(String fileDir) {
        if (!"default".equals(fileDir)) {
            if (!fileDir.endsWith(File.separator)) {
                fileDir = fileDir + File.separator;
            }
            ConfigConstants.fileDir = fileDir;
        }
    }

}

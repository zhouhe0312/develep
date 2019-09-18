package cn.powertime.iatp.filepreview.service.cache;

import java.util.List;
import java.util.Map;

/**
 * @auther: chenjh
 * @time: 2019/4/2 16:45
 * @description
 */
public interface CacheService {
    String REDIS_FILE_PREVIEW_PDF_KEY = "converted-preview-pdf-file";
    String REDIS_FILE_PREVIEW_IMGS_KEY = "converted-preview-imgs-file";//压缩包内图片文件集合
    String REDIS_FILE_PREVIEW_PDF_IMGS_KEY = "converted-preview-pdfimgs-file";


    Integer DEFAULT_PDF_CAPACITY = 500000;
    Integer DEFAULT_IMG_CAPACITY = 500000;
    Integer DEFAULT_PDFIMG_CAPACITY = 500000;

    void initPDFCachePool(Integer capacity);
    void initIMGCachePool(Integer capacity);
    void initPdfImagesCachePool(Integer capacity);
    void putPDFCache(String key, String value);
    void putImgCache(String key, List<String> value);
    Map<String, String> getPDFCache();
    String getPDFCache(String key);
    Map<String, List<String>> getImgCache();
    List<String> getImgCache(String key);
    Integer getPdfImageCache(String key);
    void putPdfImageCache(String pdfFilePath, int num);

    void addQueueTask(String url);
    String takeQueueTask() throws InterruptedException;

}

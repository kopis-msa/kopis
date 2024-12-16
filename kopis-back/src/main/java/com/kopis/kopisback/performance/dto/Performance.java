package com.kopis.kopisback.performance.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.ibatis.type.Alias;

@Getter
@Setter
@ToString
@Alias("perf")
public class Performance {
    private String prfId;
    private String prfNm;
    private String prfType;
    private String price;
    private String author;

    private String zip;
    private String addr;
    private String startdate;
    private String enddate;
}

package com.kopis.kopisback.performance.repository;

import com.kopis.kopisback.performance.dto.Performance;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface PerformanceMapper {
    List<Performance> findAll();
    Performance findById(String prfId);
    void insertPerformance(Performance performance);
    void updatePerformance(Performance performance);
    void deletePerformance(String prfId);
}
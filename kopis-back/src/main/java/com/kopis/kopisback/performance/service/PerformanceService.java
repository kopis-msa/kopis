package com.kopis.kopisback.performance.service;

import com.kopis.kopisback.performance.dto.Performance;
import com.kopis.kopisback.performance.repository.PerformanceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerformanceService {

    private static final Logger log = LoggerFactory.getLogger(PerformanceService.class);

    private final PerformanceMapper performanceMapper;

    public PerformanceService(PerformanceMapper performanceMapper) {
        this.performanceMapper = performanceMapper;
    }

    public List<Performance> findAll() {
        return performanceMapper.findAll();
    }

    public Performance findById(String prfId) {
        return performanceMapper.findById(prfId);
    }

    public void insertPerformance(Performance performance) {
        performanceMapper.insertPerformance(performance);
    }

    public void updatePerformance(Performance performance) {
        performanceMapper.updatePerformance(performance);
    }

    public void deletePerformance(String prfId) {
        performanceMapper.deletePerformance(prfId);
    }
}

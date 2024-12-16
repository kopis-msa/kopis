package com.kopis.kopisback.performance.controller;

import com.kopis.kopisback.performance.dto.Performance;
import com.kopis.kopisback.performance.service.PerformanceService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/performance")
@RestController
@RequiredArgsConstructor
public class PerformanceController {

    private final PerformanceService performanceService;

    private static final Logger log = LoggerFactory.getLogger(PerformanceController.class);

    @GetMapping("/findAll")
    public ResponseEntity<Object> retrieveAll() {
        log.info("performance Controller");
        List<Performance> performance = performanceService.findAll();
        log.info ("find {}",performance);
        return ResponseEntity.ok().body(performance);
    }

    @GetMapping
    public ResponseEntity<Object> retrieveEntity() {
        log.info("performance Controller");
        Performance performance = performanceService.findById("PRF000001");
        log.info ("find {}",performance);
        return ResponseEntity.ok().body(performance);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registerPerformance(@RequestBody Performance performance) {
        performanceService.insertPerformance(performance);
        log.info ("register : {}",performance);
        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/delete")
    public ResponseEntity<Object> deletePerformance(@RequestBody Performance performance) {
        performanceService.deletePerformance(performance.getPrfId());
        log.info ("delete : {}",performance);
        return ResponseEntity.ok().body(null);
    }
}

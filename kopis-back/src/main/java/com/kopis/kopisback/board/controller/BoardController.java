package com.kopis.kopisback.board.controller;

import com.kopis.kopisback.board.dto.Board;
import com.kopis.kopisback.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/board")
@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    private static final Logger log = LoggerFactory.getLogger(BoardController.class);

    @GetMapping
    public ResponseEntity<Object> retrieveEntity() {
        List<Board> boardList = boardService.getBoardList();
        log.info ("{}",boardList);
        return ResponseEntity.ok().body(boardList.isEmpty() ? null : boardList);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registerBoard(@RequestBody Board board) {
        Board registerBoard = boardService.registerBoard(board);
        log.info ("register : {}",registerBoard);
        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/delete")
    public ResponseEntity<Object> deleteBoard(@RequestBody Board board) {
        int res = boardService.deleteBoard(board);
        log.info ("deleteBoard {} : {}",res, board);
        return ResponseEntity.ok().body(null);
    }
}

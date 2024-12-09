package com.kopis.kopisback.board.service;

import com.kopis.kopisback.board.dto.Board;
import com.kopis.kopisback.board.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public List<Board> getBoardList() {
        List<Board> boardList = boardRepository.findAll();
        return boardList;
    }

    public List<Board> findByBno() {
        List<Board> boardList = boardRepository.findByBno(1);
        return boardList;
    }

    public Board registerBoard(Board board) {
        board.setBno(null);
        return boardRepository.save(board);
    }

    @Transactional
    public int deleteBoard(Board board) {
        return boardRepository.deleteByBno(board.getBno());
    }
}
package com.kopis.kopisback.board.repository;

import com.kopis.kopisback.board.dto.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByBno(int bno);

    int deleteByBno(Integer bno);
}

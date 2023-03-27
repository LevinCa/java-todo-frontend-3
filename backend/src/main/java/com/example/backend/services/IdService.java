package com.example.backend.services;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdService {

    public String create() {
        return UUID.randomUUID().toString();
    }
}

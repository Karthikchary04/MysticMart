package com.mysticmart.mysticmart.controllers;

import com.mysticmart.mysticmart.models.User;
import com.mysticmart.mysticmart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Objects;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/mysticmart/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (Objects.nonNull(userService.registerUser(user))) {
            return ResponseEntity.ok("Registration Successful");
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        final String token = userService.loginUser(user);
        if (StringUtils.hasLength(token)) {
            return ResponseEntity.ok(Collections.singletonMap("token",token));
        }
        return ResponseEntity.notFound().build();
    }
}

package com.mysticmart.mysticmart.service;

import com.mysticmart.mysticmart.models.User;

public interface UserService {
    User registerUser(User user);
    String loginUser(User user);

    User getUserByUsername(String userName);
}

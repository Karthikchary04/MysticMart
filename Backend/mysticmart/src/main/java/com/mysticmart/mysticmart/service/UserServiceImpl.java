package com.mysticmart.mysticmart.service;

import com.mysticmart.mysticmart.DAO.UserDao;
import com.mysticmart.mysticmart.models.User;
import com.mysticmart.mysticmart.utility.JwtUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JwtUtility jwtUtility;

    @Override
    public User registerUser(final User user) {
        if (Objects.isNull(userDao.getUserByUsername(user.getUsername()))) {
            PasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode(user.getPassword()));
            return userDao.save(user);
        }
        return null;
    }

    @Override
    public String loginUser(User user) {
        String userEnteredPassword = user.getPassword();
        User storedUser = userDao.getUserByUsername(user.getUsername());
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        if (Objects.nonNull(storedUser) && encoder.matches(userEnteredPassword,storedUser.getPassword())) {
            return jwtUtility.generateToken(storedUser.getUsername());
        }
        return null;
    }

    @Override
    public User getUserByUsername(final String userName) {
        return userDao.getUserByUsername(userName);
    }
}

package com.mysticmart.mysticmart.DAO;

import com.mysticmart.mysticmart.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User,String> {
    User getUserByUsername(String username);
}

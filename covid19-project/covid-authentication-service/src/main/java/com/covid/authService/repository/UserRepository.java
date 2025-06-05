package com.covid.authService.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.covid.authService.domain.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	
    User findByUserNameAndPassword(String username, String password);
    
    User findByUserName(String username);


}

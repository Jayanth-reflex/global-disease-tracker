package com.covid.authService.service;


import com.covid.authService.Exception.UserAlreadyExistsException;
import com.covid.authService.Exception.UserNotFoundException;
import com.covid.authService.Exception.ValidationException;
import com.covid.authService.domain.ResetPasswordRequest;
import com.covid.authService.domain.User;

public interface UserService {
    
    User register(User user) throws UserAlreadyExistsException;

    User login(String email, String password) throws UserNotFoundException;
    
    User fetchUserByUsername(String username) throws UserNotFoundException;
    
    User updateUser(User user) throws ValidationException;
    
    void resetPassword(ResetPasswordRequest user) throws ValidationException;

}

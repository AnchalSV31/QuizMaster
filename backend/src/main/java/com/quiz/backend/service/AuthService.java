package com.quiz.backend.service;

import com.quiz.backend.dto.JwtResponse;
import com.quiz.backend.dto.LoginRequest;
import com.quiz.backend.dto.SignupRequest;
import com.quiz.backend.model.User;
import com.quiz.backend.repository.UserRepository;
import com.quiz.backend.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // ================= LOGIN =================
    public JwtResponse login(LoginRequest loginRequest) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail().toLowerCase().trim(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtTokenProvider.generateToken(authentication);

            User user = userRepository.findByEmail(
                    loginRequest.getEmail().toLowerCase().trim()
            ).orElseThrow(() ->
                    new RuntimeException("User not found"));

            return new JwtResponse(
                    jwt,
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole().name()
            );

        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid email or password");
        }
    }

    // ================= SIGNUP =================
    public String signup(SignupRequest signupRequest) {

        String email = signupRequest.getEmail().toLowerCase().trim();

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));

        // Make sure role is valid
        try {
            user.setRole(User.Role.valueOf(
                    signupRequest.getRole().toUpperCase()
            ));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role. Use STUDENT or ADMIN");
        }

        userRepository.save(user);

        return "User registered successfully";
    }
}

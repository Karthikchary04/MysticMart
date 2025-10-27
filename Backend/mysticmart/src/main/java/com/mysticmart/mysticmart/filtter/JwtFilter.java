package com.mysticmart.mysticmart.filtter;

import com.mysticmart.mysticmart.models.User;
import com.mysticmart.mysticmart.service.UserService;
import com.mysticmart.mysticmart.utility.JwtUtility;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtility jwtUtility;
    private final UserService userService;

    public JwtFilter(JwtUtility jwtUtility, UserService userService) {
        this.jwtUtility = jwtUtility;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        if (path.equals("/mysticmart/user/register") || path.equals("/mysticmart/user/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwtToken = authHeader.substring(7); // remove "Bearer "
            username = jwtUtility.extractUsername(jwtToken); // parse username from token
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userService.getUserByUsername(username);

            if (Objects.nonNull(user) && jwtUtility.validateToken(jwtToken, user)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                user, null);

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}

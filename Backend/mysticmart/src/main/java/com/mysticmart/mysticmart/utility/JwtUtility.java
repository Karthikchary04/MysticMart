package com.mysticmart.mysticmart.utility;

import com.mysticmart.mysticmart.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtility {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(String username) {
        Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // Extract username (subject) from token
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Validate token against user details
    public boolean validateToken(String token, User user) {
        final String username = extractUsername(token);
        return (username.equals(user.getUsername()) && !isTokenExpired(token));
    }

    // Helper: check expiry
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // Helper: parse all claims
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

}

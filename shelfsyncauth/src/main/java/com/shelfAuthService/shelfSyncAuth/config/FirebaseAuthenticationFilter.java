package com.shelfAuthService.shelfSyncAuth.config;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class FirebaseAuthenticationFilter extends OncePerRequestFilter {

    private String extractAuthToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authToken = extractAuthToken(request);
        if (StringUtils.hasText(authToken)) {
            try {
                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(authToken);
                if (decodedToken != null) {
                    List<String> role = List.of("ROLE_" + decodedToken.getClaims().get("role").toString());
                    List<SimpleGrantedAuthority> authorities = role.stream()
                            .map(SimpleGrantedAuthority::new)
                            .toList();
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(decodedToken.getUid(), null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception ex) {
                // Token verification failed
                logger.error("Firebase token verification failed: " + ex.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}
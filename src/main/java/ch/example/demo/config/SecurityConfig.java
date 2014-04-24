package ch.example.demo.config;

import ch.example.demo.security.AjaxAuthenticationFailureHandler;
import ch.example.demo.security.AjaxAuthenticationSuccessHandler;
import ch.example.demo.security.AjaxLogoutSuccessHandler;
import ch.example.demo.security.Http401UnauthorizedEntryPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.inject.Inject;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, jsr250Enabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Inject private AjaxAuthenticationSuccessHandler ajaxAuthenticationSuccessHandler;
    @Inject private AjaxAuthenticationFailureHandler ajaxAuthenticationFailureHandler;
    @Inject private AjaxLogoutSuccessHandler ajaxLogoutSuccessHandler;
    @Inject private Http401UnauthorizedEntryPoint authenticationEntryPoint;

    @Bean
    public org.springframework.security.core.userdetails.UserDetailsService userDetailsService() {
        return new ch.example.demo.security.UserDetailsService();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
            .antMatchers("/lib/**")
            .antMatchers("/scripts/**")
            .antMatchers("/styles/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .and()
            .formLogin()
                .loginProcessingUrl("/auth/login")
                .successHandler(ajaxAuthenticationSuccessHandler)
                .failureHandler(ajaxAuthenticationFailureHandler)
                .usernameParameter("j_username")
                .passwordParameter("j_password")
                .permitAll()
                .and()
            .logout()
                .logoutUrl("/auth/logout")
                .logoutSuccessHandler(ajaxLogoutSuccessHandler)
                .deleteCookies("JSESSIONID")
                .permitAll()
                .and()
            .csrf()
                .disable()
            .authorizeRequests()
                .antMatchers("/auth/**").authenticated()
                .antMatchers("/api/**").authenticated()
                .antMatchers("/*").permitAll()
                .antMatchers("/auth/rest/authenticate").permitAll();
    }

}
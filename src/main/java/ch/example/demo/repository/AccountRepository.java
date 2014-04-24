package ch.example.demo.repository;

import ch.example.demo.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    @Query("select a from Account a where a.email = ?1")
    Account findByEmail(String email);

}
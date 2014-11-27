package ch.example.demo.test.repository;

import ch.example.demo.model.Account;
import ch.example.demo.test.config.MockAuditorAware;
import ch.example.demo.test.config.TestConfig;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {TestConfig.class})
@Transactional
public abstract class BaseIntegrationTest {

    @PersistenceContext protected EntityManager em;
    @Inject protected MockAuditorAware auditorAware;

    @Before
    public void wireUpAuditor() {
        auditorAware.setCurrentAuditor(em.getReference(Account.class, 1));
    }

}

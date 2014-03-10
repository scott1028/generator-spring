package <%= basePackage %>.test.repository;

import <%= basePackage %>.repository.AccountRepository;
import org.junit.Test;

import javax.inject.Inject;

import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.Assert.assertThat;

public class AccountRepositoryTest extends BaseIntegrationTest {

    @Inject private AccountRepository repository;

    @Test
    public void shouldFindByEmail() {
        assertThat(repository.findByEmail("test@example.com"), notNullValue());
    }
}

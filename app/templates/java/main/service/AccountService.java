package <%= basePackage %>.service;

import <%= basePackage %>.model.Account;

public interface AccountService extends BaseService<Account, Integer> {

    Account findByEmail(String email);

    Account getCurrentAccount();

    Boolean isAuthenticated();

    Account createAccount(Account account) throws Exception;

}

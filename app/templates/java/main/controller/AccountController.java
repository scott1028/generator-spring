package <%= basePackage %>.controller;

import <%= basePackage %>.model.Account;
import <%= basePackage %>.service.AccountService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

@RestController
@RequestMapping(value = "/account", produces = "application/json")
public class AccountController {

    @Inject private AccountService service;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public String get() throws Exception {
        if (service.isAuthenticated()) {
            return service.toJson(service.getCurrentAccount());
        }
        return "{}";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String register(@RequestBody Account account) throws Exception {
        return service.toJson(service.createAccount(account));
    }

}
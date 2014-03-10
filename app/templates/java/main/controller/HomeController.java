package <%= basePackage %>.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/")
public class HomeController {

    @Value("<%= _.unescape('${site.title}') %>") private String siteTitle;

    @RequestMapping(value = "/", produces = "text/html")
    public String index(Model model) {
        model.addAttribute("siteTitle", siteTitle);
        return "index";
    }

}
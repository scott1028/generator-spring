package <%= basePackage %>.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/")
public class HomeController {

	@Value("<%= _.unescape('${site.title}') %>")  private String siteTitle;
	
	@RequestMapping("/")
	public String index(Model model) {
		model.addAttribute("siteTitle", siteTitle);
		return "index";
	}

	@RequestMapping(value = "/api/ping", method = RequestMethod.GET)
	@ResponseBody
	public Object log() {
		return "{'status': 'sucess'}";
	}

}

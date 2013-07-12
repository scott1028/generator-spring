package <%= basePackage %>.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/")
public class HomeController {
	
	@RequestMapping("/")
	public String index(Model model) {
		return "index";
	}

	@RequestMapping(value = "/api/ping", method = RequestMethod.GET)
	@ResponseBody
	public Object log() {
		return "{'status': 'sucess'}";
	}

}

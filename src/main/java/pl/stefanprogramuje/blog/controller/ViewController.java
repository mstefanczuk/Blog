package pl.stefanprogramuje.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping({
            "/blog",
            "/autor",
            "/post/{postTitleUrl:.+}",
            "/posty",
            "/kategorie",
            "/kategorie/{categoryNameUrl:.+}",
            "/kontakt"
    })
    public String index() {
        return "forward:/index.html";
    }
}

package pl.stefanprogramuje.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping({
            "/blog",
            "/autor",
            "/kategorie",
            "/kategorie/list",
            "/archiwum",
            "/post/{postTitleUrl:.+}",
            "/posty"
    })
    public String index() {
        return "forward:/index.html";
    }
}

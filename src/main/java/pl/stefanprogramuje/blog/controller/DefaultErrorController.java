package pl.stefanprogramuje.blog.controller;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class DefaultErrorController implements ErrorController {

    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public RedirectView error() {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("/");
        return redirectView;
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }
}

package pl.stefanprogramuje.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.stefanprogramuje.blog.domain.StaticContent;
import pl.stefanprogramuje.blog.service.StaticContentService;

import javax.validation.Valid;

@RestController()
@RequestMapping("/api/static-content")
public class StaticContentController {

    private final StaticContentService staticContentService;

    @Autowired
    public StaticContentController(StaticContentService staticContentService) {
        this.staticContentService = staticContentService;
    }

    @GetMapping("/{name}")
    public ResponseEntity<StaticContent> getStaticContentByName(@PathVariable String name) {
        StaticContent staticContent = staticContentService.findByName(name);

        if (staticContent == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(staticContent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StaticContent> updateStaticContent(@PathVariable Long id, @Valid @RequestBody StaticContent staticContentDetails) {
        StaticContent currentStaticContent = staticContentService.findById(id);

        if (currentStaticContent == null) {
            return ResponseEntity.notFound().build();
        }

        currentStaticContent.setName(staticContentDetails.getName());
        currentStaticContent.setBody(staticContentDetails.getBody());

        StaticContent updatedStaticContent = staticContentService.edit(currentStaticContent);
        return ResponseEntity.ok(updatedStaticContent);
    }
}

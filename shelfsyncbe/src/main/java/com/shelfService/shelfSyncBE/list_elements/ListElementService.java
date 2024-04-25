package com.shelfService.shelfSyncBE.list_elements;

import com.shelfService.shelfSyncBE.list_elements.dto.AddElementDTO;
import com.shelfService.shelfSyncBE.list_elements.dto.ReturnElementDTO;
import com.shelfService.shelfSyncBE.list_elements.dto.UpdateElementDTO;
import org.springframework.http.ResponseEntity;

public interface ListElementService {
    ResponseEntity<ReturnElementDTO> getElementById(Integer id);

    ResponseEntity<String> createElement(AddElementDTO addElementDTO);

    ResponseEntity<String> updateElementById(UpdateElementDTO updateElementDTO);

    ResponseEntity<Void> deleteElementById(Integer id);
}

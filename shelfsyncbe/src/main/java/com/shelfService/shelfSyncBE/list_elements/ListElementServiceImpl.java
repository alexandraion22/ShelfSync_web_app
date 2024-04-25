package com.shelfService.shelfSyncBE.list_elements;

import com.shelfService.shelfSyncBE.list_elements.dto.AddElementDTO;
import com.shelfService.shelfSyncBE.list_elements.dto.ReturnElementDTO;
import com.shelfService.shelfSyncBE.list_elements.dto.UpdateElementDTO;
import com.shelfService.shelfSyncBE.resources.Constants;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class ListElementServiceImpl implements ListElementService{

    private final RestTemplate restTemplate;
    public ListElementServiceImpl(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @Override
    public ResponseEntity<ReturnElementDTO> getElementById(Integer id) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/list_elements/getElementId?id="+ id, HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(null, ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<String> createElement(AddElementDTO addElementDTO) {
        try {
            return restTemplate.postForEntity(Constants.baseDbUrl + "/list_elements/createElement", addElementDTO, String.class);
        } catch (HttpClientErrorException ex) {
            return new ResponseEntity<>(ex.getMessage(),ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<String> updateElementById(UpdateElementDTO updateElementDTO) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/list_elements/updateElementById", HttpMethod.PUT, new HttpEntity<>(updateElementDTO,new HttpHeaders()), String.class);
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(ex.getMessage(),ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<Void> deleteElementById(Integer id) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/list_elements/deleteElementById?id="+id, HttpMethod.DELETE, new HttpEntity<>(new HttpHeaders()), Void.class);
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(null,ex.getStatusCode());
        }
    }
}

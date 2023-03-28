package com.example.application;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;


@Entity 
public class Dependencia {

  @Id
  @GeneratedValue
  private Integer id;  

  @NotBlank 
  private String nombre;

  @NotBlank 
  private String domicilio;



  @ManyToOne
  @JoinColumn(name = "edificio_id")
  @JsonIgnoreProperties({"dependencias"})
  private Edificio edificio;




  public Dependencia() {}


  public Dependencia(String nombre, String domicilio,Edificio edificio) {
    this.nombre = nombre;
    this.domicilio = domicilio;
    this.edificio = edificio;
  }
  

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

 

  public String getNombre() {
    return nombre;
  }
  public void setNombre(String nombre) {
    this.nombre = nombre;
  }


  public String getDomicilio() {
    return domicilio;
  }
  public void setDomicilio(String domicilio) {
    this.domicilio = domicilio;
  }

  

  public Edificio getEdificio() {
    return edificio;
  }
  public void setEdificio(Edificio edificio) {
    this.edificio = edificio;
  }



  
}
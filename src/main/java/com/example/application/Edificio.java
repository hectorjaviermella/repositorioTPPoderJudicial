package com.example.application;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;

@Entity 
public class Edificio {

  @Id
  @GeneratedValue
  private Integer id;  

  @NotBlank 
  private String nombre;

  @NotBlank 
  private String domicilio;

  @OneToMany(mappedBy="edificio")
  private List<Dependencia> dependencias;

  public Edificio(){}


  public Edificio(String nombre, String domicilio) {
    this.nombre = nombre;
    this.domicilio = domicilio;
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

  public List<Dependencia> getDependencias() {
    return dependencias;
  }
  public void setDependencias(List<Dependencia> dependencias) {
    this.dependencias = dependencias;
  }
}
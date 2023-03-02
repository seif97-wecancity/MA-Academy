import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  public language ="ar"
  public config = {
    settings: {
      layout: "Dubai",
      layout_type: "rtl",
      layout_version: "light-only",
      sidebar_type: "default-sidebar",
    },
    color: {
      primary_color: "#6870EC",
      secondary_color: "#ED7621",
    },
  };

  constructor() {
    
    
    if (this.config.settings.layout_type == "rtl")
      document
        .getElementsByTagName("html")[0]
        .setAttribute("dir", this.config.settings.layout_type);

    document.documentElement.style.setProperty(
      "--theme-deafult",
      this.config.color.primary_color
    );
    document.documentElement.style.setProperty(
      "--theme-secondary",
      this.config.color.secondary_color
    );
  }
}

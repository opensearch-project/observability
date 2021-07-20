export class VisualizationBase {
  
  private visId: string;
  private category: string;
  private visConfig: any = {};
  private types;
  
  constructor(
    visualizationId: string,
    category: string,
    config?: any,
    types?: any
  ) {
    this.visId = visualizationId;
    this.category = category;
    this.visConfig = config
    this.types = types;
  }

  getVisId = () => this.visId;

  getCategory = () => this.category;
  
  getVisConfig = () => this.visConfig;

  getTypes = () => this.types;

}
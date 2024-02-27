import { getModelForClass, prop } from "@typegoose/typegoose";

class App {
  constructor(announcements: string[], name: string, slug: string) {
    this.announcements = announcements;
    this.name = name;
    this.slug = slug;
  }

  @prop()
  public announcements: string[];

  @prop()
  public name!: string;

  @prop()
  public slug!: string;
}

const AppModel = getModelForClass(App);
export { App, AppModel };

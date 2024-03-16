import {
  getModelForClass,
  prop,
  modelOptions,
  Severity,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  },
  options: { allowMixed: Severity.ALLOW },
})
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

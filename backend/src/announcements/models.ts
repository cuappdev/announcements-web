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
class Announcement {
  constructor(
    apps: string[],
    body: string,
    buttonColor: string,
    buttonText: string,
    buttonUrl: string,
    endDate: Date,
    imageUrl: string,
    startDate: Date,
    title: string
  ) {
    this.apps = apps;
    this.body = body;
    this.buttonColor = buttonColor;
    this.buttonText = buttonText;
    this.buttonUrl = buttonUrl;
    this.endDate = endDate;
    this.imageUrl = imageUrl;
    this.startDate = startDate;
    this.title = title;
  }

  @prop()
  public apps!: string[];

  @prop()
  public body!: string;

  @prop()
  public buttonColor!: string;

  @prop()
  public buttonText!: string;

  @prop()
  public buttonUrl!: string;

  @prop()
  public endDate!: Date;

  @prop()
  public imageUrl!: string;

  @prop()
  public startDate!: Date;

  @prop()
  public title!: string;
}

const AnnouncementModel = getModelForClass(Announcement);
export { Announcement, AnnouncementModel };

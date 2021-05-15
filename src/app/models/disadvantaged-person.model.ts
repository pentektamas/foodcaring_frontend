import {Role} from "./enums/role.enum";

export class DisadvantagedPerson{
  public id: String;
  public firstName: String;
  public lastName: String;
  public location: String;
  public phoneNumber: String;
  public username: String;
  public password: String;
  public priority: number;
  public allergies: String;
  public role: Role;
  public nrOfHelps: number;
}

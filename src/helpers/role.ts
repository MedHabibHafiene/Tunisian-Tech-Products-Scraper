import { partnerRole } from "../constants/roleStandard";
import Role from "../models/Role";

export const rolePartner = async () => {
  const partner = await Role.findOne({ name: partnerRole.name });
  if (partner) {
    return partner._id;
  }
};

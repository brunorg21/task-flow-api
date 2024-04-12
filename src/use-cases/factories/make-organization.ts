import { IOrganizationCreate } from "@/models/organization-model";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-organization-repository";
import { OrganizationRepository } from "@/repositories/organization-repository";

export async function makeOrganization(
  organizationRepository: OrganizationRepository
) {
  const organization = await organizationRepository.create({
    createdAt: new Date(),
    name: "org-1",
  });

  return organization;
}

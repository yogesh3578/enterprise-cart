import SequenceRepository from "../repository/sequence.repository";

class SequenceService {
  async generateProductSku(name: string) {
    const prefix = name
      .replace(/[^A-Za-z0-9]/g, "")
      .substring(0, 3)
      .toUpperCase();

    const sequence =
      await SequenceRepository.getNextSequence("product");

    return `${prefix}-${sequence
      .toString()
      .padStart(6, "0")}`;
  }
}

export default new SequenceService();
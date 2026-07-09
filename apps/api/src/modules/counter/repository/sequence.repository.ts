import CounterModel from "../model/counter.model";

class SequenceRepository {
  async getNextSequence(name: string): Promise<number> {
    const counter = await CounterModel.findOneAndUpdate(
      { name },
      {
        $inc: {
          sequence: 1,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    return counter.sequence;
  }
}

export default new SequenceRepository();
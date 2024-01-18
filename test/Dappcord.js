const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dappcord", function() {
  const NAME = "Dappcord"
  const SYMBOL = "DPC"

  let dappcord, deployer, sender;
  describe("Deployment", () => {
    beforeEach(async () => {
      [deployer, sender] = await ethers.getSigners()
      const Dappcord = await ethers.getContractFactory("Dappcord")
      dappcord = await Dappcord.deploy(NAME, SYMBOL);
      const transaction = await dappcord.connect(deployer).createChannel("general", tokens(1));

      await transaction.wait()
    })
    describe('Deployment', () => {

    })
    describe('Creating Channels', () => {
      it('returns total Channels', async () => {
        const result = await dappcord.totalChannels();
        expect(result).to.equal(1)
      })
      it('returns channel attributes', async () => {
        const channel = await dappcord.getChannel(1);
        expect(channel.id).to.be.equal(1)
        expect(channel.name).to.be.equal('general');
        expect(channel.cost).to.be.equal(tokens(1))
      })
    })

  })
})

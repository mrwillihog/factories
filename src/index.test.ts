import { register, build } from './index';
import { expect } from 'chai';

describe('Factories', () => {
  describe('simple factory', () => {
    it('allows you to register an object', () => {
      register('test', {});
      expect(build('test')).to.be.an.instanceOf(Object);
    });

    it('allows you to specify properties on an object', () => {
      register('test', {
        property: 'My Property'
      });
      expect(build('test').property).to.equal('My Property');
    });

    it('allows you to register multiple factories', () => {
      register('test', {});
      register('test2', {});

      expect(build('test')).to.be.an.instanceOf(Object);
      expect(build('test2')).to.be.an.instanceOf(Object);
    });


    it('allows you to specify a function for a value', () => {
      register('test', {
        property: () => 'dynamic'
      });

      expect(build('test').property).to.equal('dynamic');
    });


    describe('property overrides', () => {
      it('allows you to override properties when building', () => {
        register('test', {
          property: 'incorrect'
        });

        const test = build('test', {
          property: 'correct'
        });

        expect(test['property']).to.equal('correct');
      });

      it('allows you to override a property with a function', () => {
        register('test', {
          property: 'static'
        });

        const test = build('test', {
          property: () => 'dynamic'
        });

        expect(test['property']).to.equal('dynamic');
      });
    });
  });
});

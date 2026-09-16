import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'TocarObjeto',

  schema: {
    controlador: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('esperando')
      .initial()
      .listen(eid, ecs.input.SCREEN_TOUCH_START, () => {

        const {controlador} = schemaAttribute.get(eid)

        // Avisar al controlador del mini-juego
        world.events.dispatch(
          controlador,
          'OBJETO_DJ_TOCADO',
          {
            objeto: eid,
          }
        )
      })
  },
})

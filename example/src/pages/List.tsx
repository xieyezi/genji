import React from 'react'

const List: React.FC = () => {
	return (
		<>
			<div className="show">
				<div> 你的姓名是: {state.name} </div>
				<div>{new Array(state.number).fill(0).map(() => '✨')}</div>
			</div>
			<div className="constrol">
				<div>
					{' '}
					<button onClick={() => state.number++}>✨++</button>{' '}
				</div>
				<div>
					{' '}
					<button onClick={() => state.number--}>✨--</button>{' '}
				</div>
				<input
					placeholder="姓名"
					value={state.name}
					onChange={(e: any) => (state.name = e.target.value)}
				/>
			</div>
		</>
	)
}

export default List

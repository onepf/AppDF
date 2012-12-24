package org.onepf.life;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.SurfaceHolder;
import android.view.SurfaceView;

public class LifeView extends SurfaceView implements Runnable {
	//SurfaceView login related members
	SurfaceHolder holder;
	Thread thread = null;
	volatile boolean running = false;
	
	//Size members
	int viewWidth;
	int viewHeight;
	int cellWidth = 0;
	int cellHeight = 0;

	//Field 
	int fieldWidth;
	int fieldHeight;
	int [][] field = null;
	
	//Edit more
	boolean editMode = true;

	//Cell images & background
	Bitmap activeCellBitmap = null;
	Bitmap emptyCellBitmap = null;
	int backgroundColor;
	
	public LifeView(Context context, AttributeSet attrs) {
		super(context, attrs);
		backgroundColor = context.getResources().getColor(R.color.background);
		holder = getHolder();
		activeCellBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.cell_active);
		emptyCellBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.cell_empty);
		cellWidth = activeCellBitmap.getWidth();
		cellHeight = activeCellBitmap.getHeight();
	}

	public void setEditMode(boolean editMode) {
		this.editMode = editMode;
	}
	
	public boolean getEditMode() {
		return editMode;
	}
	
	public void resume() {
		running = true;
		thread = new Thread(this);
		thread.start();
	}
	
	public void pause() {
		running = false;
		try {
			thread.join();
		} catch (InterruptedException ignore) {}
	}
	
	@Override
	public boolean onTouchEvent(MotionEvent event) {
		if (editMode) {
			int cellX = (int)(event.getX() / cellWidth);
			int cellY = (int)(event.getY() / cellHeight);
			int action = event.getAction();
			if (action==MotionEvent.ACTION_DOWN && cellX>=0 && cellY >=0 && cellX<fieldWidth && cellY <fieldHeight) {
				field[cellX][cellY] = 1 - field[cellX][cellY];
			}
		}
		
		return true;
	}	

	@Override
	public void run() {
		while (running) {
			if (holder.getSurface().isValid()) {
				Canvas canvas = holder.lockCanvas();
				if (!editMode) {
					updateField();
				}
				onDraw(canvas);
				holder.unlockCanvasAndPost(canvas);
				try {
					Thread.sleep(16);
				} catch (InterruptedException ignore) {}
			}
		}
	}

	int getNeighbour(int x, int y, int dx, int dy) {
		int x2 = x + dx;
		int y2 = y + dy;
		if (x2<0) x2 += fieldWidth;
		if (y2<0) y2 += fieldHeight;
		if (x2>=fieldWidth) x2 -= fieldWidth;
		if (y2>=fieldHeight) y2 -= fieldHeight;
		
		return field[x2][y2];
	}
	
	int getNeighboursCount(int x, int y) {
		int count = 0;
		
		//Check all the cell's neighbours
		for (int dx=-1; dx<=1; dx++) {
			for (int dy=-1; dy<=1; dy++) {
				//except the cell itself
				if (dx!=0 || dy!=0) {
					count += getNeighbour(x, y, dx, dy);
				}
			}
		}
		return count;
	}
	
	void updateField() {
		int[][] field2 = new int[fieldWidth][fieldHeight];
		for (int x=0; x<fieldWidth; x++) {
			for (int y=0; y<fieldHeight; y++) {
				
				field2[x][y] = field[x][y];
				int neighbours = getNeighboursCount(x, y);
				
				if (neighbours<2) {
					field2[x][y] = 0;
				} else if (neighbours==2) {
					field2[x][y] = field[x][y];
				} else if (neighbours==3) {
					field2[x][y] = 1;
				} else {
					field2[x][y] = 0;
				}
			}
		}
		field = field2;
	}
	
	@Override
	 public void onDraw(Canvas canvas) {
		canvas.drawColor(backgroundColor);
		for (int x=0; x<fieldWidth; x++) {
			for (int y=0; y<fieldHeight; y++) {
				if (field[x][y]==1) {
					canvas.drawBitmap(activeCellBitmap, x*cellWidth, y*cellHeight, null);
				} else {
					canvas.drawBitmap(emptyCellBitmap, x*cellWidth, y*cellHeight, null);
				}
			}
		}
	}		
	
	@Override
	public void onSizeChanged(int w, int h, int oldW, int oldH) {
		viewWidth = w;
		viewHeight = h;
		fieldWidth = viewWidth / cellWidth ;
		fieldHeight = viewHeight / cellHeight ;

		initField();
	}
	
	void initField() {
		field = new int[fieldWidth][fieldHeight];
		for (int x=0; x<fieldWidth; x++) {
			for (int y=0; y<fieldHeight; y++) {
				field[x][y] = 0;
			}
		}
		field[5][5] = 1;
		field[6][5] = 1;
		field[7][5] = 1;
		field[7][4] = 1;
		field[6][3] = 1;
	}
	
	
}
